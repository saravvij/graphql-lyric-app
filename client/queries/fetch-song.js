import gql from "graphql-tag";

export default gql`
query Song($id: ID!) {
    song(id: $id) {
        id
        title, 
        lyrics {
            
        }
    }
}
`;
