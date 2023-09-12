import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";

const CommentArea = props => {
  //state = {
  //  comments: [],
  //  isLoading: false,
  //  isError: false,
  //  isFirstLoad: true
  //};

  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchComments = async () => {
    //this.setState({ isLoading: true });
    setIsLoading(true);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/books/" + props.asin + "/comments/", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njc3ZDEwYmNhMDAwMTQ1ODNmZTIiLCJpYXQiOjE2OTQ0MzU5OTUsImV4cCI6MTY5NTY0NTU5NX0.WusGLpD46QBGjcSOHJev5UfetAXmhAm1xfdW5Oftnxo",
        },
      });
      console.log(response);
      if (response.ok) {
        setComments(await response.json());
        //this.setState({ comments: comments, isLoading: false, isError: false, isFirstLoad: false });
        setIsLoading(false);
        setIsError(false);
        setIsFirstLoad(false);
      } else {
        console.log("error");
        //this.setState({ isLoading: false, isError: true });
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      //this.setState({ isLoading: false, isError: true });
      setIsLoading(false);
      setIsError(true);
    }
  };

  //componentDidMount() {
  //  console.log("componentDidMount()");
  //}

  //componentDidUpdate(prevProps) {
  //  if (prevProps.asin !== this.props.asin) {
  //    this.fetchComments();
  //    console.log("siamo in componentDidUpdate e stiamo fetchando");
  //  } else {
  //    console.log("siamo in componentDidUpdate ma senza più fetch");
  //  }
  //}

  useEffect(() => {
    if (props.asin !== "") fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  return (
    <div className="text-center">
      <h2>CommentArea</h2>
      {isError && <Error />}
      <AddComment asin={props.asin} />
      {isLoading && <Loading />}

      {!isLoading && !isFirstLoad && comments.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>Non ci sono ancora commenti</ListGroup.Item>
        </ListGroup>
      ) : (
        <CommentList commentsToShow={comments} />
      )}
    </div>
  );
};

export default CommentArea;
