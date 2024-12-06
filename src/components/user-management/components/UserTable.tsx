'use client'
import React from 'react'
import Table from '../common/table'
import { UserTableData } from '@/types/User'
import Column from '../common/column';
import LinkButton from '../common/LinkButton';
import { Edit2 } from 'lucide-react';
import useFetchUsers from './UserTable.hook';
import Pagination from '../common/pagination';

const dummyData : UserTableData[] = [];

interface UserTableProps{
  currentIndex : number
  currentLimit : number
}

const UserTable : React.FC<UserTableProps> = ({currentIndex,currentLimit}) => {

  const {users, totalPage,onLimitChange,onPageChange} = useFetchUsers({currentIndex});

  const actionTemplate = (data: UserTableData, index: number | undefined) => (
    <div className='flex justify-center items-center'>
        <LinkButton name="Edit" url={`/warung-saham/user/${data.userId}/edit`}>
            <Edit2 className='hover:text-primary-400'/>
        </LinkButton>
    </div>
); 

  return (
    <div>
      <Table<UserTableData> data={users} totalData={0} rowId='userId'>
          <Column header='NO' body={(_,index = 1) => ((currentIndex - 1) * currentLimit) + index + 1}/>
          <Column header='Username' field='username'/>
          <Column header='Email' field='email'/>
          <Column header='Name' field='name'/>
          <Column header='phoneNumber' field='phoneNumber'/>
          <Column header='Action' body={(data,index) => actionTemplate(data,index)}/>
      </Table>
      <Pagination 
        currentPage={currentIndex} 
        currentLimit={currentLimit.toString()}
        limits={[5,10,25]} 
        totalPage={totalPage} 
        onChangePage={onPageChange}
        onChangePageLimit={onLimitChange}
      />
    </div>
  )
}

export default UserTable
