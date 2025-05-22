import { lazy, memo, useMemo } from "react";
import { Box, NumberInput, type ComboboxItem } from "@mantine/core";
import { normalize, transform } from "@src/utils";
import { FaNewspaper } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { TbCategoryPlus } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";

import useGenre from "@src/hooks/useGenre";
import useAuthors from "@src/hooks/useAuthors";
import usePublishers from "@src/hooks/usePublishers";

const Select = lazy(() =>
  import("@mantine/core").then((m) => ({ default: m.Select }))
);

type BookFilterProps = {
  genre: string;
  price: number;
  author: string;
  publisher: string;
  onFilterPrice: (price: number) => void;
  onFilterGenre: (genre: string) => void;
  onFilterAuthor: (author: string) => void;
  onFilterPublisher: (publisher: string) => void;
};

const BookFilter: React.FC<BookFilterProps> = (props) => {
  const { fetchGenre } = useGenre();

  const { fetchAuthors } = useAuthors();

  const { fetchPublishers } = usePublishers();

  const genres = useMemo(
    () => transform(normalize(fetchGenre) ?? [], "name", "id"),
    [fetchGenre]
  );

  const authors = useMemo(
    () => transform(normalize(fetchAuthors) ?? [], "name", "id"),
    [fetchAuthors]
  );

  const publishers = useMemo(
    () => transform(normalize(fetchPublishers) ?? [], "name", "id"),
    [fetchPublishers]
  );

  const handleChangePrice = (value: number | string) => {
    props.onFilterPrice(value as number);
  };

  const handleChangeGenre = (_value: string | null, option: ComboboxItem) => {
    props.onFilterGenre(option.value);
  };

  const handleChangeAuthor = (_value: string | null, option: ComboboxItem) => {
    props.onFilterAuthor(option.value);
  };

  const handleChangePublisher = (
    _value: string | null,
    option: ComboboxItem
  ) => {
    props.onFilterPublisher(option.value);
  };

  return (
    <Box>
      <div className="flex justify-evenly items-center">
        <Box>
          <Select
            className="w-full"
            size="xs"
            searchable
            label="Genre"
            data={genres}
            value={props.genre}
            placeholder="Filter by Genre"
            onChange={handleChangeGenre}
            checkIconPosition="right"
            leftSection={<TbCategoryPlus className="text-emerald-400" />}
          />
        </Box>
        <Box>
          <NumberInput
            className="w-full"
            placeholder="Filter by price"
            size="xs"
            label="Price"
            leftSection={<HiCurrencyDollar className="text-emerald-400" />}
            value={props.price}
            onChange={handleChangePrice}
          />
        </Box>
        <Box>
          <Select
            className="w-full"
            size="xs"
            searchable
            label="Author"
            data={authors}
            value={props.author}
            placeholder="Filter by Author"
            onChange={handleChangeAuthor}
            checkIconPosition="right"
            leftSection={<FaUserCheck className="text-emerald-400" />}
          />
        </Box>
        <Box>
          <Select
            className="w-full"
            size="xs"
            searchable
            label="Publisher"
            data={publishers}
            value={props.publisher}
            placeholder="Filter by Publisher"
            onChange={handleChangePublisher}
            checkIconPosition="right"
            leftSection={<FaNewspaper className="text-emerald-400" />}
          />
        </Box>{" "}
      </div>
    </Box>
  );
};

export default memo(BookFilter);
