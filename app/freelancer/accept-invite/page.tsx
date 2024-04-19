'use client';
import React from 'react'
import { SearchBarProvider } from './context/SearchBarContext'
import ListInvite from './components/ListInvite'
import Pagiantion from './components/Pagination';

const page = () => {
  return (
    <SearchBarProvider>
    <div className='relative'>
        {/* <SubHeader /> */}
       
        {/* <SearchBar /> */}
        <ListInvite />
        <Pagiantion />
    </div>
</SearchBarProvider>
  )
}

export default page