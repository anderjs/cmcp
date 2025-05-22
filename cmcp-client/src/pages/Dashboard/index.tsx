/* eslint-disable react-hooks/exhaustive-deps */
import { MdBook, MdOutlineDeleteSweep } from "react-icons/md";
import { Dialog, Input, Modal, HoverCard, LoadingOverlay } from "@mantine/core";
import { Fade } from "react-awesome-reveal";
import { lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDisclosure, useDebouncedCallback } from "@mantine/hooks";
import { Box, Button, Group, Table, Text, Pagination } from "@mantine/core";
import { VscOpenPreview } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdFilterAltOff, MdOutlineMenuBook } from "react-icons/md";

import useBooks from "@src/hooks/useBooks";
import useQueryStore from "@src/store/query";

import { TIMER } from "@src/utils/debounce";
import { getQueryData, paginate, toUSD } from "@src/utils";
import {
  bookSchema,
  bookFormSchema,
  type IBookForm,
  type BookSchema,
} from "@src/schema/book.schema";
import { BooksQueryKey } from "@src/query";
import { useNavigate } from "react-router";
import { loaderProps, overlayProps } from "@src/utils/props";

const Loading = lazy(() => import("@src/components/Loading"));
const BookForm = lazy(() => import("@src/components/BookForm"));
const BookFilter = lazy(() => import("@src/components/BookFilter"));

const Dashboard: React.FC = () => {
  const mount = useRef(false);

  const modalTitle = useRef<string>("");

  const navigate = useNavigate();

  const { fetchBook, deleteBook, createBook, fetchBooks, updateBook } =
    useBooks();

  const { setQueryArgs } = useQueryStore();

  const [page, setPage] = useState<number>(1);

  const [limit] = useState<number>(10);

  const [price, setPrice] = useState<number>(0);

  const [genre, setGenre] = useState<string>("");

  const [author, setAuthor] = useState<string>("");

  const [publisher, setPublisher] = useState<string>("");

  const [opened, modal] = useDisclosure();

  const [deleted, deleting] = useDisclosure(false);

  const books = useMemo(() => paginate(fetchBooks), [fetchBooks.data]);

  const search = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
    },
  });

  const book = useForm<IBookForm>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      price: 0,
      genre: "",
      title: "",
      author: "",
      publisher: "",
      file: null,
    },
  });

  const title = useWatch({
    name: "title",
    control: search.control,
  });

  const debounce = useDebouncedCallback(async () => {
    if (mount.current) {
      setQueryArgs(BooksQueryKey.BOOKS, {
        page,
        title,
        limit,
      });

      const ref = await fetchBooks.refetch();

      const items = getQueryData(ref);

      if (page > Math.ceil((items?.total as number) / limit)) {
        setPage(1);
      }
    }
  }, TIMER);

  useEffect(() => {
    if (mount.current) {
      debounce();
    }
  }, [title]);

  useEffect(() => {
    if (genre || author || publisher) {
      setQueryArgs(BooksQueryKey.BOOKS, {
        page,
        genre,
        limit,
        author,
        publisher,
      });
    } else {
      setQueryArgs(BooksQueryKey.BOOKS, {
        page,
        limit,
      });
    }
    mount.current = true;

    if (mount.current) {
      fetchBooks.refetch();
    }
  }, [limit, genre, author, publisher]);

  const update = modalTitle?.current?.includes?.("Update");

  const handleCreateBook = async (data: IBookForm) => {
    if (update) {
      const { books } = useQueryStore.getState();

      const { id } = books[BooksQueryKey.FIND_BOOK];

      return await updateBook.mutateAsync(
        {
          id: id as number,
          ...data,
        },
        {
          onSuccess: async () => {
            const notifications = await import("@mantine/notifications");

            notifications.showNotification({
              color: "green",
              message: "Book updated successfully",
            });

            book.reset({
              price: 0,
              genre: "",
              title: "",
              author: "",
              publisher: "",
            });

            fetchBooks.refetch();

            modal.close();
          },
          onError: async () => {
            const notifications = await import("@mantine/notifications");

            notifications.showNotification({
              color: "red",
              message: "Book can't be created at the moment",
            });
          },
        }
      );
    }

    await createBook.mutateAsync(data, {
      onSuccess: async () => {
        const notifications = await import("@mantine/notifications");

        notifications.showNotification({
          color: "green",
          message: "Book created successfully",
        });

        book.reset({
          price: 0,
          genre: "",
          title: "",
          author: "",
          publisher: "",
        });

        fetchBooks.refetch();

        modal.close();
      },
      onError: async () => {
        const notifications = await import("@mantine/notifications");

        notifications.showNotification({
          color: "red",
          message: "Book can't be created at the moment",
        });
      },
    });
  };

  const handleClearBookForm = () => {
    book.reset({
      price: 0,
      genre: "",
      title: "",
      author: "",
      publisher: "",
    });

    search.reset();

    fetchBooks.refetch();

    setGenre("");

    setAuthor("");

    setPublisher("");
  };

  const handleUpdateBook = useCallback(
    async (id: number) => {
      modalTitle.current = "Update a book";

      setQueryArgs(BooksQueryKey.FIND_BOOK, {
        id,
      });

      const ref = getQueryData(await fetchBook.refetch());

      book.reset({
        title: ref?.title,
        price: ref?.price,
        genre: ref?.genre?.name,
        author: ref?.author?.name,
        publisher: ref?.publisher?.name,
      });

      modal.toggle();
    },
    [setQueryArgs]
  );

  const handleOpenCreateBook = () => {
    book.reset({
      price: 0,
      genre: "",
      title: "",
      author: "",
      publisher: "",
    });

    modalTitle.current = "Create a book";

    modal.toggle();
  };

  const handleCloseAndClear = () => {
    book.reset({
      price: 0,
      genre: "",
      title: "",
      author: "",
      publisher: "",
    });

    modal.close();
  };

  const handleChangePage = (page: number) => {
    setPage(page);

    setQueryArgs(BooksQueryKey.BOOKS, {
      page,
    });

    fetchBooks.refetch();
  };

  const handleDeleteBook = useCallback(
    async (id: number) => {
      setQueryArgs(BooksQueryKey.DELETE_BOOK, {
        id,
      });

      deleting.open();
    },
    [setQueryArgs]
  );

  const handleConfirmDelete = async () => {
    const { books } = useQueryStore.getState();

    const book = books[BooksQueryKey.DELETE_BOOK];

    deleting.toggle();

    await deleteBook.mutateAsync(book.id as number, {
      onSuccess: async () => {
        const notifications = await import("@mantine/notifications");

        notifications.showNotification({
          color: "green",
          message: "Book deleted",
        });
      },
      onError: async () => {
        const notifications = await import("@mantine/notifications");

        notifications.showNotification({
          color: "red",
          message: "Book can't be deleted at the moment",
        });
      },
    });
  };

  const handleVisualizeAudit = useCallback(async (id: number) => {
    navigate(`/audit/${id}`, {
      replace: true,
    });

    const notifications = await import("@mantine/notifications");

    notifications.showNotification({
      loading: true,
      color: "green",
      message: "Loading Audit.. Please Wait",
    });
  }, []);

  return (
    <Fade delay={0.3}>
      <Box className="flex justify-end items-center gap-1.5" my="md">
        <Button
          color="gray"
          onClick={handleClearBookForm}
          disabled={!title && !author && !genre && !publisher && !price}
        >
          Clear Filter <MdFilterAltOff />
        </Button>
        <Button onClick={handleOpenCreateBook} color="green">
          <Group align="center">
            <Box>Create Book</Box>
            <MdBook />
          </Group>
        </Button>
      </Box>

      <Box mb="lg" mt="xs">
        <Controller
          control={search.control}
          name="title"
          render={({ field }) => (
            <Input
              value={field.value}
              placeholder="Search for a book name"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </Box>
      <BookFilter
        price={price}
        genre={genre}
        author={author}
        publisher={publisher}
        onFilterPrice={setPrice}
        onFilterGenre={setGenre}
        onFilterAuthor={setAuthor}
        onFilterPublisher={setPublisher}
      />
      <Loading status={fetchBooks.isLoading || deleteBook.isPending}>
        <Box pos="relative">
          <LoadingOverlay
            zIndex={1000}
            loaderProps={loaderProps}
            overlayProps={overlayProps}
            visible={deleteBook.isPending || fetchBooks.isRefetching}
          />
          <Table
            mt="lg"
            withTableBorder
            highlightOnHover
            withColumnBorders
            striped
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Genre</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Publisher</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {books?.data?.map((book) => (
                <Table.Tr key={book.id}>
                  <Table.Td className="capitalize text-base">
                    {book.title}
                  </Table.Td>
                  <Table.Td>{book.genre.name}</Table.Td>
                  <Table.Td>{toUSD(book.price)}</Table.Td>
                  <Table.Td>{book.author.name}</Table.Td>
                  <Table.Td>{book.publisher.name}</Table.Td>
                  <Table.Td className="w-[10%]">
                    <Group>
                      <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                          <Button
                            size="xs"
                            color="green"
                            onClick={() => handleVisualizeAudit(book.id)}
                          >
                            <VscOpenPreview />
                          </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          <Text size="sm">
                            Check audit logs of {book.title}'s Book
                          </Text>
                        </HoverCard.Dropdown>
                      </HoverCard>
                      <Button
                        size="xs"
                        color="green"
                        onClick={() => handleUpdateBook(book.id)}
                      >
                        <MdOutlineMenuBook />
                      </Button>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <MdOutlineDeleteSweep />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
        {fetchBooks.isSuccess && (
          <Pagination
            my="md"
            value={page}
            color="green"
            className="flex justify-center"
            total={books?.total as number}
            onChange={handleChangePage}
          />
        )}
        {books?.data?.length === 0 && (
          <Text mt="xl" className="text-center" size="lg">
            No books available
          </Text>
        )}
      </Loading>
      <Modal opened={opened} onClose={modal.close} title={modalTitle.current}>
        <BookForm
          form={book}
          loading={updateBook.isPending}
          onClose={handleCloseAndClear}
          onSubmit={handleCreateBook}
          update={update}
        />
      </Modal>
      <Dialog opened={deleted} onClose={deleting.close}>
        <div className="text-base flex justify-center items-center gap-2.5">
          Are you sure want to delete this book?
        </div>
        <Group ml="md" mt="xs">
          <Button size="xs" color="red" onClick={handleConfirmDelete}>
            Confirm
          </Button>
          <Button size="xs" color="gray" onClick={deleting.close}>
            Cancel
          </Button>
        </Group>
      </Dialog>
    </Fade>
  );
};

export default Dashboard;
