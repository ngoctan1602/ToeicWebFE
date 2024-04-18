import AddQuetion from "./component/admin/test/question/addQuestion";
import AddNewTest from "./component/admin/test/test/addTest";
import ManageYearTopicOfTest from "./component/admin/test/topic_year/manageTest";
import Login from "./component/user/login/login";
import Test from "./component/user/test/test";
import TestOverView from "./component/user/test/testOverview";

export const AdminRouter = [
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
]

export const UserRoutes = [
    // {
    //     path: "/history",
    //     component: Test
    // },
    {
        path: "/test",
        component: Test
    },
    {
        path: '/test/:id',
        component: TestOverView
    },
    {
        path: 'login',
        component: Login
    }
]
