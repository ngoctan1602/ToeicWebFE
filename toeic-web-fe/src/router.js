import AddQuetion from "./component/admin/test/question/addQuestion";
import AddNewTest from "./component/admin/test/test/addTest";
import ManageYearTopicOfTest from "./component/admin/test/topic_year/manageTest";
import Logout from "./component/user/common/logout";
import Focus from "./component/user/common/testfocus";
import HistoryDetail from "./component/user/history/historyDetail";
import Login from "./component/user/login/login";
import Practice from "./component/user/practice/practice";
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
    },
    {
        path: 'focus',
        component: Focus
    }
]


export const PrivateUserRoutes = [
    {
        path: '/practice/:id',
        component: Practice
    },
    {
        path: '/history/:idHistory/test/:idTest',
        component: HistoryDetail
    },
    // {
    //     path: '/logout',
    //     component: Logout
    // }
]
