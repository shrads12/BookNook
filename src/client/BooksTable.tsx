import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Book, deleteBook } from "../shared/redux/bookSlice";
import { useAppDispatch, useAppSelector } from "../shared/redux/hooks";
import { RootState } from "../shared/redux/store";
import { AddEditBook } from "./AddEditBook";
import { Loading } from "./Loading";

interface Props {
  books: Book;
}

export function BooksTable() {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector(
    (state: RootState) => state.books
  );
  const [addBookVisible, showAddEditBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>();

  useEffect(() => {
    if (selectedBook) {
      showAddEditBook(true);
    }
  }, [selectedBook]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "2rem",
      }}
    >
      <h1 style={{ margin: 0 }}>Book List</h1>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <Button variant="contained" onClick={() => showAddEditBook(true)}>
        ADD BOOK
      </Button>
      <TableContainer sx={{ maxWidth: "50%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                onClick={() => setSelectedBook(book)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="error"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await dispatch(deleteBook(book.id));
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addBookVisible && (
        <AddEditBook
          book={selectedBook}
          onClose={() => {
            setSelectedBook(null);
            showAddEditBook(false);
          }}
        />
      )}
    </div>
  );
}
