import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    email: null,
    role: null,
    nombre: null
  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.role = action.payload.role
      state.nombre = action.payload.nombre
    },
    clearUser: (state) => {
      state.uid = null
      state.email = null
      state.role = null
      state.nombre = null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer