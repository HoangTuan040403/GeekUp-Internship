import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsJournalAlbum } from 'react-icons/bs';
import { FaUsersRectangle } from "react-icons/fa6";

const { Header, Content, Sider } = Layout;

export default function MainPage() {
    const [keySelected, setKeySelected] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Sider
                width={200}
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                collapsedWidth={isMobile ? 0 : 80}
                breakpoint="md"
                style={{ background: '#fff', borderRight: 'none' }}
            >
                <div
                    className="logo"
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        height: 64,
                        transition: 'all 0.3s ease',
                        padding: collapsed ? 0 : '10px 16px',
                    }}
                >
                    <img
                        src="https://geekup.vn/Icons/geekup-logo-general.svg"
                        alt="GEEKUP company logo"
                        style={{
                            width: 100,
                            transition: 'all 0.3s ease',
                            objectFit: 'contain',
                        }}
                    />
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[keySelected]}
                    defaultSelectedKeys={['albums']}
                    onClick={(e) => setKeySelected(e.key)}
                    style={{ height: '100%', marginTop: 6 }}
                >
                    <Menu.Item key="albums" icon={<BsJournalAlbum />} >
                        <Link to="/albums" title="Album management">Albums</Link>
                    </Menu.Item>
                    <Menu.Item key="users" icon={<FaUsersRectangle />} >
                        <Link to="/users" title="User management">Users</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: '#fff',
                        zIndex: 1000,
                        position: 'sticky',
                        top: 0,
                    }}
                ></Header>

                <Content
                    style={{
                        padding: 22,
                        overflowY: 'auto',
                        height: 'calc(100vh - 64px)',
                        background: '#EEEEEE'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
} 