import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers, getAlbums } from '../api/api';
import { Avatar, Card, Typography, Divider, Breadcrumb, Space, Table, Button } from 'antd';
import { HiMiniArrowLeft } from 'react-icons/hi2';
import { EyeOutlined } from '@ant-design/icons';
import { FaUsersRectangle } from "react-icons/fa6";

const { Title } = Typography;

const avatarColors = [
    '#e73c61', '#EEEEEE', '#065488', '#6600CC', '#f39c12',
    '#777373', '#2e92cc', '#7b1abc', '#ddc1eb', '#ecb9a2'
];

export default function UserDetail() {
    const { id } = useParams();

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const { data: albums } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums,
    });

    const user = users?.data?.find(u => u.id === Number(id));

   
    const userAlbums = albums?.data?.filter(album => album.userId === Number(id));

    const avatarColor = user ? avatarColors[(user.id - 1) % avatarColors.length] : '#ccc';

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Link to={`/albums/${record.id}`}>
                    <Button icon={<EyeOutlined />} size="small">Show</Button>
                </Link>
            ),
        },
    ];

    if (!user || !userAlbums) return <div>Loading...</div>;

    return (
        <div>
            <Breadcrumb style={{ marginBottom: 16 }}>
                <Breadcrumb.Item>
                    <Link to="/users">
                        <FaUsersRectangle style={{ marginRight: 4 }} />
                        Users
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Show</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Link to="/albums" style={{ display: 'flex', alignItems: 'center' }}>
                    <HiMiniArrowLeft size={20} style={{ marginRight: 14, color: 'black' }} />
                </Link>
                <Title level={4} style={{ margin: 0, flex: 1 }}>Show User</Title>
            </div>
            <Card style={{ background: '#fff' }}>
                <Card>
                    <Space align="center" style={{ marginBottom: 16 }}>
                        <Avatar
                            style={{
                                backgroundColor: avatarColor,
                                verticalAlign: 'middle',
                                marginRight: 12
                            }}
                            size="large"
                        >
                            {user.name
                                .split(' ')
                                .map(word => word[0])
                                .join('')
                                .toUpperCase()}
                        </Avatar>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 'bold' }}>{user.name}</div>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                    </Space>
                    <Divider />
                    <Title level={4}>Albums</Title>
                    <Table
                        dataSource={userAlbums}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        style={{ background: '#fff', borderRadius: 8, padding: 16 }}
                    />
                </Card>
            </Card>
        </div>
    );
}
