import Vue from 'vue'
import VueRouter from 'vue-router'

const AdminLogin = () => import('../views/admin/Login')
const AdminHome = () => import('../views/admin/Home')
const AdminWelcome = () => import('../views/admin/Welcome')
const AdminBookList = () => import('../views/admin/book/BookList')
const AdminBookCategory = () => import('../views/admin/book/BookCategory')
const AdminAddBook = () => import('../views/admin/book/AddBook')
const AdminBookInfo = () => import('../views/admin/order/BookInfo')
const AdminLeadingInfo = () => import('../views/admin/order/LeadingInfo')
const AdminLeadHistory = () => import('../views/admin/order/LeadHistory')
const AdminBlackUser = () => import('../views/admin/reader_manage/BlackUser')
const AdminReport = () => import('../views/admin/report/Report')

const ReaderHome = () => import('../views/reader/Home')
const ReaderLogin = () => import('../views/reader/Login')
const ReaderRegister = () => import('../views/reader/Register')
const BookInfo = () => import('../views/reader/BookInfo')
const CategoryPage = () => import('../views/reader/CategoryPage')
const Account = () => import('../views/reader/account/Account')
const User = () => import('../views/reader/account/User')
const Book = () => import('../views/reader/account/Book')
const Leading = () => import('../views/reader/account/Leading')
const History = () => import('../views/reader/account/History')



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/reader/home"
  },
  {
    path: "/admin/login",
    component: AdminLogin
  },
  {
    path: "/admin/home",
    component: AdminHome,
    redirect: "/admin/welcome",
    children: [
      {
        path: '/admin/welcome',
        component: AdminWelcome
      },
      {
        path: '/admin/booklist',
        component: AdminBookList
      },
      {
        path: '/admin/addbook',
        component: AdminAddBook
      },
      {
        path: '/admin/bookcategory',
        component: AdminBookCategory
      },
      {
        path: '/admin/booking',
        component: AdminBookInfo
      },
      {
        path: '/admin/leading',
        component: AdminLeadingInfo
      },
      {
        path: '/admin/leadhistory',
        component: AdminLeadHistory
      },
      {
        path: '/admin/blackuser',
        component: AdminBlackUser
      },
      {
        path: '/admin/bookreport',
        component: AdminReport
      }
    ]
  },
  {
    path: "/reader/home",
    component: ReaderHome
  },
  {
    path: '/reader/login',
    component: ReaderLogin
  },
  {
    path: '/reader/register',
    component: ReaderRegister
  },
  {
    path: '/reader/bookinfo/:isbn',
    component: BookInfo
  },
  {
    path: '/reader/book/category/:category',
    component: CategoryPage
  },
  {
    path: '/reader/account',
    component: Account,
    redirect: '/reader/account/user',
    children: [
      {
        path: '/reader/account/user',
        component: User
      },
      {
        path: '/reader/account/book',
        component: Book
      },
      {
        path: '/reader/account/leading',
        component: Leading
      },
      {
        path: '/reader/account/history',
        component: History
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path.startsWith('/admin') && to.path != '/admin/login' && !tokenStr) {
    return next('/admin/login')
  }

  if (to.path == '/reader/account' && (!tokenStr)) {
    return next('/reader/login')
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
