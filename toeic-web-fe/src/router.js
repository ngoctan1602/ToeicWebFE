import AddQuetion from "./component/admin/test/question/addQuestion";
import AddNewTest from "./component/admin/test/test/addTest";
import ManageYearTopicOfTest from "./component/admin/test/topic_year/manageTest";
import Test from "./component/user/test/test";
import TestDetail from "./component/user/test/testDetail";

export const AdminRouter = [

    // {
    //     path: 'admin/account',
    //     // component: null,
    // },
    {
        path: 'admin/test/year',
        component: ManageYearTopicOfTest
    },
    {
        path: 'admin/question',
        component: AddQuetion
    },
    {
        path: 'admin/test/create',
        component: AddNewTest
    },
    {
        path: `admin/test/${id}`,
        component: TestDetail
    },
    // {
    //     path: 'admin/test/',
    //     // component: null
    // },
    // account:
    // {
    //     path: 'admin/account',
    //     component: null,
    // },
    // testYear: {
    //     path: 'admin/test/year',
    //     component: ManageYearTopicOfTest
    // },
    // question: {
    //     path: 'admin/question',
    //     component: AddQuetion
    // },
    // testNew: {
    //     path: 'admin/test/create',
    //     component: AddNewTest
    // },
    // test: 'admin/test',
    // testTopic: 'admin/test/topic',
    // testNew: 'admin/test/create',
    // login: 'admin/login'
]

export const UserRoutes = [
    {
        path: "/history",
        component: Test
    },
    {
        path: "/test",
        component: Test
    }
]
