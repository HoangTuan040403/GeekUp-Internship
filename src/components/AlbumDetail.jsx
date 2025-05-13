import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAlbums, getUsers } from '../api/api';
import { Avatar, Card, Typography, Divider, Space, Breadcrumb } from 'antd';
import { HiMiniArrowLeft } from "react-icons/hi2";
import { BsJournalAlbum } from "react-icons/bs";

const { Title } = Typography;

const avatarColors = [
    '#e73c61', '#EEEEEE', '#065488', '#6600CC', '#f39c12',
    '#777373', '#2e92cc', '#7b1abc', '#ddc1eb', '#ecb9a2'
];

export default function AlbumDetail() {
    const { id } = useParams();

    const { data: albumData } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums,
    });

    const album = albumData?.data.find(a => a.id === Number(id));



    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const user = users?.data.find(u => u.id === album?.userId);
    const avatarColor = user ? avatarColors[(user.id - 1) % avatarColors.length] : '#ccc';

    return (
        <div>

            <Breadcrumb style={{ marginBottom: 16 }}>
                <Breadcrumb.Item>
                    <Link to="/users">
                        <BsJournalAlbum style={{ marginRight: 4 }} />
                        Albums
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Show</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Link to="/albums" style={{ display: 'flex', alignItems: 'center' }}>
                    <HiMiniArrowLeft size={20} style={{ marginRight: 14, color: 'black' }} />
                </Link>
                <Title level={4} style={{ margin: 0, flex: 1 }}>Show Album</Title>
            </div>
            <Card style={{ background: '#fff' }}>
                {user && (
                    <Card >
                        <Space align="center">
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
                                <Link to={`/users/${user.id}`}>
                                    <div style={{ fontSize: 16, fontWeight: 'bold' }}>{user.name}</div>
                                </Link>
                                <a href={`mailto:${user.email}`}>
                                    {user.email}
                                </a>

                            </div>
                        </Space>
                        <Divider />
                        <Title level={5}>{album?.title}</Title>
                    </Card>
                )}
                {/* <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={photos?.data}
                    style={{ marginTop: 24 }}
                    renderItem={item => (
                        <List.Item>
                            <div
                                hoverable
                                cover={<img alt={item.title} src={item.thumbnailUrl} />}
                            >
                                <Text>{item.title}</Text>
                            </div>
                        </List.Item>
                    )}
                /> */}

            </Card>
        </div>
    );
}
