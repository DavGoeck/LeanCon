import './Page.css'
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Page = () => {
    return (
        <div id="page-container">
            <div id="content-wrap">
                <Header />
                <div className="main">
                    <Sidebar />
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Page;