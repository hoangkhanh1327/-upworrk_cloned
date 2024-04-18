'use client';
import React from 'react'
import { SearchBarProvider } from './context/SearchBarContext'
import Pagiantion from '../dashboard/components/Pagination'
import ListInvite from './components/ListInvite'

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