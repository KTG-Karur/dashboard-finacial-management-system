import { Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

const CustomTabComponent = (props) => {

    const { title, activeKey, tabContents=[] } = props;
    
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-4">{title || ""}</h4>

                <Tab.Container defaultActiveKey={activeKey}>
                    <Nav as="ul" variant="pills" justify className="navtab-bg">
                        {(tabContents || []).map((tab, index) => {
                            return (
                                <Nav.Item as="li" key={index.toString()}>
                                    <Nav.Link as={Link} to="#" className="cursor-pointer" eventKey={tab.keyEvent}>
                                        {tab.title}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>

                    <Tab.Content>
                        {(tabContents || []).map((tab, index) => {
                            console.log(tab.tableData)
                            return (
                                <Tab.Pane eventKey={tab.keyEvent} id={String(tab.keyId)} key={index.toString()}>
                                    <Table
                                        columns={tab.tableColumns}
                                        // Title={'Department List'}
                                        data={tab.tableData || []}
                                        pageSize={10}
                                    />
                                </Tab.Pane>
                            );
                        })}
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default CustomTabComponent;
