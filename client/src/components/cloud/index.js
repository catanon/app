import React from "react";
import styled from "styled-components";
import cloud from "./cloud.png";

const Container = styled.div`
    position: fixed;
    /*
     * Formula for top:
     * (end - start) * sensitivity-1 ** (yOffset / sensitivity-2) + end
     */
    top: ${props => `${Math.round(100 * 0.5 ** (props.yOffset / 100)) + 100}px`};
    /* Here start is 200 and end is 100 */
    z-index: -1;
`;

class Cloud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yOffset: window.pageYOffset
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        this.setState({yOffset: window.pageYOffset});
    }
    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        return (<Container yOffset={this.state.yOffset}>
            <img src={cloud} alt=""></img>
        </Container>);
    }
}

export default Cloud;
