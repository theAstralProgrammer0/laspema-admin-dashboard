import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const userId = useSelector((state) => state.global.userId)
  // eslint-disable-next-line
  const { data, error, isLoading } = useGetUserQuery(userId, {
    skip: !userId, // Skip the query if userId is falsy
    onSuccess: (result) => console.log('getUser query result:', result),
    onError: (error) => console.error('getUser query error:', error),
  });
  
  // console.log('data:', data);
  // console.log('error:', error);
  // console.log('isLoading:', isLoading);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          />
        <Outlet/>
      </Box>

    </Box>
  )
}

export default Layout