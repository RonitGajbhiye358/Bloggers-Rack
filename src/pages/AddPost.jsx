import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="pt-36 pb-8 bg-[url('/background-picture.jpeg')]">
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost