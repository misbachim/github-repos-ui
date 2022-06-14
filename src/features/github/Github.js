import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Form, Image, InputGroup, ListGroup, Spinner, Stack } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getGithub,
  selectGithub,
} from './githubSlice';

export function Github() {
  const github = useSelector(selectGithub);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null)
  const userRef = useRef()

  useEffect(() => {
    if (username) {
      dispatch(getGithub(username))
    }
  }, [username])
  
  const handleSearchUser = () => {
    setUsername(userRef.current.value)
  } 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchUser()
    }
  }

  return (
    <Container>
      <Stack direction='horizontal' className="w-50" >
        <InputGroup className="mb-3">
          <InputGroup.Text>
            https://github.com/
          </InputGroup.Text>
          <Form.Control ref={userRef} placeholder='username' onKeyDown={handleKeyDown} />
          <Button onClick={handleSearchUser}>Search</Button>
        </InputGroup>
      </Stack>
      {
        (
          !github.value && github.status === 'idle' &&
          <Card className="text-center" body>
            Start search github user's repositories
          </Card>
        )
        ||
        (
          github.status === 'loading' &&
          <Card className="text-center" body>
          <Spinner animation="border" />
          </Card>
        )
      }
      {
        (
          github.status === 'error' &&
          <Card className="text-center" body>
            {github.value}
          </Card>
        )
        || 
        (
          github.status === 'idle' && github.value && (
            <Card className="text-center">
              <Card.Header>
                <Image className="w-25" src={github.value.profile.avatar_url} roundedCircle />
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Card.Link href={github.value.profile.html_url} style={{ textDecoration: 'none' }}>
                    {github.value.profile.name ? github.value.profile.name : github.value.profile.login}
                  </Card.Link>
                </Card.Title>
                <Card.Text>
                  {github.value.profile.bio}
                </Card.Text>
              </Card.Body>
              {
                (
                  github.value.repos.length === 0 &&
                  <Card.Text>
                    Repositories not found
                  </Card.Text>
                )
                ||
                (
                  github.value.repos.length !== 0 &&
                  <Card.Body>
                    <ListGroup variant="flush">
                      {
                        github.value.repos.map(repo => {
                          return (
                            <ListGroup.Item key={repo.name}>
                              <Card.Link href={repo.html_url} style={{ textDecoration: 'none' }}>
                                {repo.name}
                              </Card.Link>
                            </ListGroup.Item>
                          )
                        })
                      }
                    </ListGroup>
                  </Card.Body>
                )
              }
            </Card>
          )
        )
      }
    </Container>
  );
}
