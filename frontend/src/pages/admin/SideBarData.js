import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2 from '@mui/icons-material/Inventory2';
import Discount from '@mui/icons-material/Discount';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ChatIcon from '@mui/icons-material/Chat';

export const SideBarAdminData = [
    {
        title: 'Dashboard',
        icon: <Home />,
        link: '/admin',
    },
    {
        title: 'Khách hàng',
        icon: <People />,
        link: '/admin/users',
    },
    {
        title: 'Danh mục sản phẩm',
        icon: <CategoryIcon />,
        link: '/admin/categories',
    },
    {
        title: 'Sản phẩm',
        icon: <Inventory2 />,
        link: '/admin/products',
    },
    {
        title: 'Thêm sản phẩm',
        icon: <AddToPhotosIcon />,
        link: '/admin/add-products',
    },
    {
        title: 'Khuyến mãi và Giảm giá',
        icon: <Discount />,
        link: '/admin/discount',
    },
    {
        title: 'Đơn hàng',
        icon: <ListAltIcon />,
        link: '/admin/orders',
    },
    {
        title: 'Tin nhắn',
        icon: <ChatIcon />,
        link: '/admin/chat',
    },
];
