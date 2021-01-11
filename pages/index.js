import { useEffect, useState } from 'react'
import EmployeeForm from '../Components/Employee/EmployeeForm'
import MainLayout from '../Components/MainLayout'
import Modal from '../Components/Modal'
import YesNoAlert from '../Components/YesNoAlert'
import { API_URLS, componentCss } from '../Constants'
import service from '../service'

export default function Home() {
  const [employees, setEmployees] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [loader, setLoader] = useState(false)
  const [modalData, setModalData] = useState({
    open: false,
    data: null
  })

  useEffect(async () => {
    const userDetails = JSON.parse(window.localStorage.getItem('user_details'))
    if (userDetails && userDetails.userType === 1) {
      setLoader(true)
      const result = await service(API_URLS.employeeList, {
        method: 'GET'
      })
      if (result.data) {
        setEmployees(result?.data?.list || [])
      } else {
        console.log(result.message)
      }
      setLoader(false)
    }
    setUserDetails(userDetails)
  }, [])

  const refreshList = async () => {
    setLoader(true)
    const result = await service(API_URLS.employeeList, {
      method: 'GET'
    })
    if (result.data) {
      setEmployees(result?.data?.list || [])
    } else {
      console.log(result.message)
    }
    setLoader(false)
  }

  if(loader){
    return (
      <MainLayout>
        <div className="w-full h-full flex justify-center items-center bg-black opacity-60">
        <svg className="animate-spin h-20 w-20 mr-3 ... z-10 bg-indigo-500" viewBox="0 0 24 24">
          </svg>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {userDetails?.userType === 1 ?

        <div className="flex flex-col bg-white h-full">
          <Modal
            open={modalData.open}
            data={modalData.data}
            component={modalData.component}
            onClose={() => {
              setModalData({
                open: false
              })
            }}
            containerStyle={{
              width: modalData?.width ? modalData.width : '500px',
              height: modalData?.height ? modalData.height : '500px'
            }}
            refreshList={modalData.refreshList}
            {...(modalData?.rest || {})}
          />
          <div className="flex mx-4 my-4 justify-end items-center">
            <button className={componentCss.button} onClick={() => {
              setModalData({
                open: true,
                data: {
                  create: true
                },
                height: '630px',
                refreshList: refreshList,
                component: EmployeeForm
              })
            }}>
              Add Employee
        </button>
          </div>
          <div className="flex mx-4 mb-4 border rounded-md shadow-md  overflow-auto" style={{ maxHeight: '82vh'}}>
            <table className='w-full divide-y divide-gray-200'>
              <thead className="bg-indigo-50 position-fixed">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB (yyyy-mm-dd)
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOJ (yyyy-mm-dd)
          </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
          </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {employees?.length &&
                  employees.map(employee => {

                    return (
                      <tr key={employee._id}>
                        <td className="px-6 py-4 whitespace-nowrap gap-4 flex items-center justify-start">
                          <div className="text-indigo-500 h-14 w-14 rounded-full bg-pink-300 border mr-4 uppercase flex justify-center items-center font-bold tex-3xl">
                            {
                              employee.firstName[0] + employee.lastName[0]
                            }
                          </div>
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.dateOfBirth}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.dateOfJoining}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full gap-4 flex">
                            <button className={componentCss.button}
                              onClick={() => {
                                setModalData({
                                  open: true,
                                  component: EmployeeForm,
                                  refreshList: refreshList,
                                  height: '570px',
                                  data: {
                                    edit: true,
                                    id: employee._id,
                                    email: employee.email,
                                    dob: employee.dateOfBirth,
                                    doj: employee.dateOfJoining,
                                    designation: employee.designation,
                                    firstName: employee.firstName,
                                    lastName: employee.lastName,
                                  }
                                })
                              }}
                            >
                              Edit
                    </button>
                            <button className={componentCss.button}
                              onClick={() => {
                                setModalData({
                                  open: true,
                                  component: YesNoAlert,
                                  rest: {
                                    onOkClick: async () => {
                                      const res = await service(API_URLS.deleteEmployee + '/' + employee._id, {
                                        method: 'DELETE'
                                      })
                                      if (res.data) {
                                        setModalData({
                                          open: false
                                        })
                                        refreshList()
                                      }
                                    }
                                  },
                                  data: {
                                    id: employee._id,
                                    heading: 'Delete Employee',
                                    message: 'Do you really want to delete this employee details?'
                                  },
                                  width: 'auto',
                                  height: 'auto'
                                })
                              }}
                            >
                              Delete
                    </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

        :

       <div className="h-full w-full flex justify-center items-center">
          <label className={componentCss.noteLg}>
             No Results Found
          </label>
       </div>

      }
    </MainLayout>
  )
}
