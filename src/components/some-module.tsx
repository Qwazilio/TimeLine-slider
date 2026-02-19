import styled from "styled-components";

const SomeContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 2em;
    background: white;
    border: 0.1em solid black;
`;

export default function SomeModule(){
    return (
        <SomeContainer>
            <h1>Some Module</h1>
        </SomeContainer>
    );
}

