import { Table, Avatar, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getAlbums, getUsers } from '../api/api';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { useState } from 'react';

export default function AlbumTable() {
    const { data: albums } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums,
    });

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    if (!albums || !users) return <div>Loading...</div>;

    const usersMap = {};
    users.data.forEach(user => {
        usersMap[user.id] = user;
    });

    const avatarColors = [
        '#e73c61', '#EEEEEE', '#065488', '#6600CC', '#f39c12',
        '#777373', '#2e92cc', '#7b1abc', '#ddc1eb', '#ecb9a2'
    ];

    const userColorMap = {};
    users.data.forEach((user, index) => {
        userColorMap[user.id] = avatarColors[index % avatarColors.length];
    });

    const paginatedData = albums.data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

            render: (id) => <div style={{ width: 25 }}>{id}</div>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'User',
            key: 'user',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
            render: (_, record) => {
                const user = usersMap[record.userId];
                if (!user) return null;

                const bgColor = userColorMap[user.id];

                return (
                    <Link
                        to={`/users/${user.id}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 0
                        }}
                    >
                        <Avatar
                            style={{
                                marginRight: 8,
                                backgroundColor: bgColor,
                                color: '#fff',
                                flexShrink: 0,
                            }}
                        >
                            {user.name
                                .split(' ')
                                .map(part => part[0])
                                .join('')
                                .toUpperCase()}
                        </Avatar>
                        <span style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {user.name}
                        </span>
                    </Link>
                );
            },
        },
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

    return (
        <div style={{ padding: 8 }}>
            <Table
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{ background: '#fff' }}
                scroll={{ x: 'max-content' }}  
            />

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 16 }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={albums.data.length}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
