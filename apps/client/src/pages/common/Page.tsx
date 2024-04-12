import { ReactElement } from 'react';
import './Page.css'
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

interface PageProps {
    content: ReactElement
}

const Page = (props: PageProps) => {
    const { content } = props;
    return (
        <div id="page-container">
            <div id="content-wrap">
                <Header />
                <div className="main">
                    <Sidebar />
                    <div className="content">
                        { content }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Page;