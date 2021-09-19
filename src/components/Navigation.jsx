import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
    return (
        <Navbar bg="navbar navbar-dark" expand="md">
            <Container>
                <Link to="/" className="navbar-brand">
                    <img src="/assets/logo.png" alt="Fresh Tomatoes" />
                </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/genres" className="nav-link">
                                Genres
                            </NavLink>
                            <NavLink to="/popular" className="nav-link">
                                Popular
                            </NavLink>
                            <NavLink to="/upcoming" className="nav-link">
                                Upcoming
                            </NavLink>
                            <NavLink to="/toprated" className="nav-link">
                                Top Rated
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
