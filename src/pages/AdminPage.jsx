import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <h2>Bienvendio</h2>
      <p>Aquí puedes crear editar y borrar los materiales y productos que necesitas en los eventos.</p>
      <Outlet />
    </>
  )
}