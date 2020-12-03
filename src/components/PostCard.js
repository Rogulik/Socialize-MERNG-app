import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { formatDistanceToNow } from 'date-fns'

const PostCard = ({ post: {body, createdAt, id, username, likesCount, commentsCount, likes} }) => {    

    const likePost = () => {
        console.log('like post')
    }

    const commentPost = () => {
        console.log('comment post')
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>Molly Thomas</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{formatDistanceToNow(new Date(createdAt))}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
                <Label basic color='teal' pointing='left'>
                    { likesCount }
                </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='blue' basic>
                    <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                    { commentsCount }
                </Label>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard
