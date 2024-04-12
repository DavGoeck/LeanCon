import { ReactElement } from 'react';
import './Page.css'
import Footer from './common/Footer';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

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
                    <div>
                        { content }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Page;