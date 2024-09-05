import React from 'react'
import "./breadcrumb.css"
import { Breadcrumb, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Breadcrumbs = (props) => {
  return (
    <>
        <div className="inner-banner-wrap">
            <div className="inner-banner-container">
                <Container>
                    <div className="inner-banner-content">
                        <h1 className='fs-1 text-white text-uppercase font-bold'>{props.title}</h1>
                    </div>
                </Container>
            </div>
        </div>
        <div className="navbar-link">
                <Container>
                    <Row>
                        <Breadcrumb>
                            <Breadcrumb.Item active>
                                <NavLink to="/"><i className='bi bi-house-door-fill me-1'></i>Home / {props.pagename}</NavLink>
                            </Breadcrumb.Item>
                        </Breadcrumb> 
                    </Row>
                </Container>
        </div>


    </>
  )
}

export default Breadcrumbs