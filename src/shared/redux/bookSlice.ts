import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ThunkAction } from "redux-thunk";

export interface Book {
  id?: number;
  title: string;
  category: string;
  price: number;
  description?: string;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

const booksData = [
  { id: 1, title: "The Silent Observer", category: "Mystery", price: 15.99 },
  {
    id: 2,
    title: "Exploring the Cosmos",
    category: "Science Fiction",
    price: 12.5,
  },
  { id: 3, title: "Cooking Delights", category: "Cookbook", price: 20.99 },
  {
    id: 4,
    title: "Historical Perspectives",
    category: "History",
    price: 18.75,
  },
  { id: 5, title: "Poetry in Motion", category: "Poetry", price: 14.95 },
];

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.books = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBookSuccess: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      state.loading = false;
    },
    deleteBookSuccess: (state, action: PayloadAction<number>) => {
      const index = state.books.findIndex((book) => book.id === action.payload);
      state.books.splice(index, 1);
      state.loading = false;
    },
    updateBookSuccess: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      state.books[index] = action.payload;
      state.loading = false;
    },
  },
});

export const {
  start,
  fetchBooksSuccess,
  error,
  addBookSuccess,
  deleteBookSuccess,
  updateBookSuccess,
} = bookSlice.actions;

export default bookSlice.reducer;

export const fetchBooks =
  (): ThunkAction<void, RootState, null, PayloadAction<Book[] | string>> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const books = await mockFetch();
      dispatch(fetchBooksSuccess(books));
    } catch (e) {
      dispatch(error(e.message || "An error occurred"));
    }
  };

export const addBook =
  (
    book: Book
  ): ThunkAction<void, RootState, null, PayloadAction<Book | string>> =>
  async (dispatch, getState) => {
    try {
      dispatch(start());
      await mockFetch();
      const { books } = getState().books;
      dispatch(addBookSuccess({ ...book, id: books.length + 1 }));
    } catch (e) {
      dispatch(error(e.message || "An error occured"));
    }
  };

export const updateBook =
  (
    book: Book
  ): ThunkAction<void, RootState, null, PayloadAction<Book | string>> =>
  async (dispatch) => {
    try {
      dispatch(start());
      await mockFetch();
      dispatch(updateBookSuccess(book));
    } catch (e) {
      dispatch(error(e.message || "An error occured"));
    }
  };

export const deleteBook =
  (
    bookId: number
  ): ThunkAction<void, RootState, null, PayloadAction<number | string>> =>
  async (dispatch) => {
    try {
      dispatch(start());
      await mockFetch();
      dispatch(deleteBookSuccess(bookId));
    } catch (e) {
      dispatch(error(e.message || "An error occured"));
    }
  };

async function mockFetch() {
  return new Promise<Book[]>((resolve) => {
    setTimeout(() => {
      resolve(booksData);
    }, 1000);
  });
}
