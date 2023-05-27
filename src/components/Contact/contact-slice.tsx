import { createSlice, configureStore } from "@reduxjs/toolkit";

// Define the initial state
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
}

interface ContactsState {
  contacts: Contact[];
  selectedContact: Contact | null;
}

const initialState: ContactsState = {
  contacts: [],
  selectedContact: null,
};

// Create a slice
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact: Contact = {
        id: Date.now(),
        ...action.payload,
      };
      state.contacts.push(newContact);
    },
    editContact: (state, action) => {
      const { id, firstName, lastName, status } = action.payload;
      const contact = state.contacts.find((c) => c.id === id);
      if (contact) {
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.status = status;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((c) => c.id !== id);
    },
    getContactById: (state, action) => {
      const id = action.payload;
      state.selectedContact = state.contacts.find((c) => c.id === id) || null;
    },
  },
});

// Extract the action creators
const { addContact, editContact, deleteContact, getContactById } =
  contactsSlice.actions;

// Create the store
const store = configureStore({
  reducer: contactsSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { addContact, editContact, deleteContact, getContactById };
export default store;
