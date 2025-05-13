import { Table, Avatar, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/api';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

export default function AlbumTable() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    // Avatar colors array for rendering
    const avatarColors = [
        '#e73c61', '#EEEEEE', '#065488', '#6600CC', '#f39c12',
        '#777373', '#2e92cc', '#7b1abc', '#ddc1eb', '#ecb9a2'
    ];

    // Columns definition for the table
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        {
            title: 'Avatar',
            key: 'avatar',
            render: (_, record, index) => {
                const bgColor = avatarColors[index % avatarColors.length];
                return (
                    <Avatar
                        style={{
                            backgroundColor: bgColor,
                            color: '#fff',
                        }}
                    >
                        {record.name
                            .split(' ')
                            .map((part) => part.charAt(0).toUpperCase())
                            .join('')}
                    </Avatar>
                );
            },
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <a href={`mailto:${email}`}>{email}</a>, // Make email clickable
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <a href={`tel:${phone}`}>{phone}</a>, // Make phone clickable
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: (website) => (
                <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
                    {website}
                </a> // Make website clickable
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Link to={`/users/${record.id}`}>
                    <Button icon={<EyeOutlined />} size="small">Show</Button>
                </Link>
            ),
        },
    ];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users data</div>;

    return (
        <div>
            <Title level={4} style={{ margin: 0, flex: 1, marginBottom: 10 }}>Users</Title>
            <Table
                dataSource={users?.data}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{ background: '#fff' }}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
}
