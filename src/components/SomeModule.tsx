import styled from "styled-components";

const SomeContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 2em;
    background: lightsteelblue;
`;

export default function SomeModule(){
    return (
        <SomeContainer>
            <h1>Some Module</h1>
        </SomeContainer>
    );
}

