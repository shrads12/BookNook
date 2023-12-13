import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Modal, TextField } from "@mui/material";
import { addBook, Book, updateBook } from "../shared/redux/bookSlice";
import { useAppDispatch, useAppSelector } from "../shared/redux/hooks";
import { Stack } from "@mui/system";
import { RootState } from "../shared/redux/store";
import { Loading } from "./Loading";

interface Props {
  onClose: () => void;
  book?: Book;
}

export function AddEditBook({ onClose, book }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.books);
  const [title, setTitle] = useState<string>(book?.title || "");
  const [price, setPrice] = useState<string>(
    book?.price != null ? String(book?.price) : ""
  );
  const [category, setCategory] = useState<string>(book?.category || "");
  const [description, setDescription] = useState<string>(
    book?.description || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    {
      id: "title",
      value: title,
      onChangeFunc: setTitle,
    },
    {
      id: "price",
      value: price,
      onChangeFunc: setPrice,
      error: errors.price,
      validate: (value: string) => {
        setErrors((prev) => ({ ...prev, price: null }));
        if (isNaN(Number(value))) {
          setErrors((prev) => ({
            ...prev,
            price:
              "Please enter a valid price. Only numeric values, including decimals are allowed.",
          }));
          return false;
        }
        return true;
      },
    },
    {
      id: "category",
      value: category,
      onChangeFunc: setCategory,
    },
    {
      id: "description",
      value: description,
      onChangeFunc: setDescription,
    },
  ];

  return (
    <div>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <Dialog open={true} onClose={onClose} fullWidth>
        <DialogTitle>Book Details</DialogTitle>
        <Stack spacing={2} m={4} mt={2}>
          {fields.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              label={field.id}
              variant="outlined"
              value={field.value}
              onChange={(e) => {
                field.onChangeFunc(e.target.value);
                field.validate?.(e.target.value);
              }}
              error={errors[field.id] != null}
              helperText={field.error}
              required
            />
          ))}
          <Stack direction="row" justifyContent="center" columnGap={2}>
            <Button
              variant="contained"
              onClick={async () => {
                const action = book ? updateBook : addBook;
                await dispatch(
                  action({
                    ...book,
                    title,
                    price: Number(price),
                    category,
                    description,
                  })
                );
                onClose();
              }}
              disabled={
                error != null ||
                Object.values(errors).some((value) => value != null)
              }
            >
              {book ? "UPDATE" : "ADD"}
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              DONE
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
}
