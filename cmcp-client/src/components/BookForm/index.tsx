import { memo, useMemo, useState } from "react";
import {
  Controller,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { normalize, transform } from "@src/utils";
import {
  Box,
  Text,
  Input,
  Group,
  Button,
  Select,
  Switch,
  FileInput,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { TbCategoryPlus } from "react-icons/tb";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaFileImage, FaUserCheck, FaNewspaper, FaBook } from "react-icons/fa";
import type { IBookForm } from "@src/schema/book.schema";

import useGenre from "@src/hooks/useGenre";
import useAuthors from "@src/hooks/useAuthors";
import usePublishers from "@src/hooks/usePublishers";
import { loaderProps, overlayProps } from "@src/utils/props";

type BookFormProps = {
  update?: boolean;
  form: UseFormReturn<IBookForm>;
  onSubmit: SubmitHandler<IBookForm>;
  onClose: () => void;
  loading?: boolean;
};

const BookForm: React.FC<BookFormProps> = ({
  form,
  update,
  loading,
  onClose,
  onSubmit,
}) => {
  const { fetchGenre } = useGenre();

  const { fetchAuthors } = useAuthors();

  const { fetchPublishers } = usePublishers();

  const [renderFileInput, setRenderFileInput] = useState<boolean>(false);

  const genres = useMemo(
    () => transform(normalize(fetchGenre) ?? [], "name", "name"),
    [fetchGenre]
  );

  const authors = useMemo(
    () => transform(normalize(fetchAuthors) ?? [], "name", "name"),
    [fetchAuthors]
  );

  const publishers = useMemo(
    () => transform(normalize(fetchPublishers) ?? [], "name", "name"),
    [fetchPublishers]
  );

  const handleInvalid = async () => {
    const notifications = await import("@mantine/notifications");

    notifications.showNotification({
      color: "red",
      message: "To create a book, please enter the requirements",
    });
  };

  const errors = form.formState.errors;

  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={1000}
        loaderProps={loaderProps}
        overlayProps={overlayProps}
        visible={loading}
      />
      <div className="flex justify-center">
        <form
          className="flex flex-col gap-2.5 w-full justify-center"
          onSubmit={form.handleSubmit(onSubmit, handleInvalid)}
        >
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input.Wrapper
                label="Title"
                error={
                  <Text size="xs" className="my-1">
                    {errors?.title?.message}
                  </Text>
                }
                required
              >
                <Input
                  type="text"
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  placeholder="Introduce Book's Title"
                  leftSection={<FaBook className="text-emerald-400" />}
                />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <Input.Wrapper
                label="Price"
                error={
                  <Text size="xs" className="my-1">
                    {errors?.price?.message}
                  </Text>
                }
              >
                <NumberInput
                  placeholder="Enter book's price"
                  prefix="$"
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  leftSection={
                    <HiCurrencyDollar className="text-emerald-400" />
                  }
                />
              </Input.Wrapper>
            )}
          />
          {update && !renderFileInput ? (
            <Switch
              my="xs"
              color="green"
              label="File Upload"
              checked={renderFileInput}
              onChange={(e) => setRenderFileInput(e.currentTarget.checked)}
            />
          ) : (
            <Controller
              name="file"
              control={form.control}
              render={({ field }) => (
                <FileInput
                  value={field.value}
                  label="Image"
                  required
                  accept="image/png, image/gif, image/jpeg"
                  placeholder="Attach an Image"
                  onChange={(e) => field.onChange(e)}
                  leftSectionPointerEvents="none"
                  error={
                    <Text size="xs" className="my-1">
                      {errors?.file?.message}
                    </Text>
                  }
                  leftSection={<FaFileImage className="text-emerald-400" />}
                />
              )}
            />
          )}
          <Controller
            name="genre"
            control={form.control}
            render={({ field }) => (
              <Select
                className="w-full"
                searchable
                label="Genre"
                data={genres}
                value={field.value}
                required
                placeholder="Select a Book's Genre"
                onChange={(e) => field.onChange(e)}
                leftSection={<TbCategoryPlus className="text-emerald-400" />}
              />
            )}
          />
          <Controller
            name="author"
            control={form.control}
            render={({ field }) => (
              <Select
                className="w-full"
                searchable
                label="Author"
                data={authors}
                value={field.value}
                required
                placeholder="Select a Book's Author"
                onChange={(e) => field.onChange(e)}
                leftSection={<FaUserCheck className="text-emerald-400" />}
              />
            )}
          />
          <Controller
            name="publisher"
            control={form.control}
            render={({ field }) => (
              <Select
                className="w-full"
                searchable
                label="Publisher"
                data={publishers}
                value={field.value}
                placeholder="Select a Book's Publisher"
                required
                onChange={(e) => field.onChange(e)}
                leftSection={<FaNewspaper className="text-emerald-400" />}
              />
            )}
          />
          <Group justify="center" gap="xs">
            <Button type="submit" color="gray">
              {update ? "Update" : "Create"}
            </Button>
            <Button color="red" onClick={onClose}>
              Cancel
            </Button>
          </Group>
        </form>
      </div>
    </Box>
  );
};

export default memo(BookForm);
