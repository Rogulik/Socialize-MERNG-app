import React from 'react'
import PostCard from '../components/PostCard'
import { gql,    useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

const FETCH_POSTS_QUERY = gql`
       query GetPosts{
        getPosts{
            id
            body 
            createdAt 
            username 
            likesCount
            likes{
                username
            }
            commentsCount
            comments{
                id 
                username 
                createdAt 
                body
            }
        }
        }
`

const Home = () => {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)

    if(data){
        console.log(data)
    }

    if (loading) return 'Loading...';
    if (error) console.log(`Error! ${error.message}`);

    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
               {loading ? (
                   <p>Loading posts...</p>
               ) : (
                   data && data.getPosts.map(post => (
                       <Grid.Column key={post} style={{ marginBottom: 20}}>
                           <PostCard post={post}/>
                       </Grid.Column>
                   ))
               )
               }
            </Grid.Row>
        </Grid>
    )
}



export default Home
