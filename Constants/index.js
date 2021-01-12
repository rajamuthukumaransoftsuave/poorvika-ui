
export const componentCss = {
    mainContainer: 'flex justify-center items-center w-screen h-screen bg-gray-50 flex-col',
    bodyContainer: 'flex h-full w-full flex-col',
    paper: 'bg-white shadow-md flex px-4 py-4 min-w-max rounded',
    headerContainer: 'flex bg-indigo-400 h-20 shadow-md w-full justify-between items-center px-4',
    headingLg: 'text-indigo-700 antialiased text-2xl md:text-3xl font-sans font-bold capitalize',
    formContainer: 'grid flex shadow-md gap-6 bg-white mx-5 px-5 py-5 rounded min-w-max w-96',
    noteLg: 'text-gray-500 antialiased text-lg font-sans font-bold',
    tableHeader: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    tableTd: 'px-6 py-4 whitespace-nowrap',
    errorText: 'text-red-300 antialiased text-sm whitespace-nowrap pr-4 font-sans font-bold',
    button: 'uppercase inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    disableButton: 'uppercase inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'
}

export const API_URLS = {
    login: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/login',
    employeeList: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/employee/list',
    refreshToken: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/refreshToken',
    updateEmployee: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/employee/update',
    createEmployee: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/employee/add',
    deleteEmployee: process.env.NEXT_PUBLIC_BASE_API_URL+'/api/employee/delete'
}

export const employeeDesignation = [
    "Trainee",
    "Telecom Information Specialist",
    "Chief Sales Manager",
    "Human Resources Manager",
    "Telecom Associate",
    "Engineering Analyst",
    "Team Leader",
]