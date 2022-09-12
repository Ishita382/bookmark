import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { appReducers } from "../Redux/selector";
import image from "../assets/card.png";
import BookIcon from '@mui/icons-material/Book';
import Typography from '@mui/material/Typography';
const CustomBox = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BookmarkBox = styled(Box)`
  margin-bottom: 400px;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  gap: 25px;
  margin-right: 66px;
  margin-top: 30px;

  width: 170px;
  height: 140px;
  background: #ffffff;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12),
    0px 8px 24px -4px rgba(24, 39, 75, 0.08);
  border-radius: 20px;
  font-family: Arial;
`;

const LoadingBox = styled(Box)`
  font-size: 20px;
  color: #5352ED;
  font-family: Arial;
  margin-top: 150px;
  margin-left: 540px;
  
`;

const Description = styled(Box)`
  font-size: 12px;
  background-color: #f5f5f5;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
`;

const Name = styled(Box)`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: -20px;
  color: #808080;
`;

const AddLinkButton = styled(Button)`
  margin-left: 900px;
  margin-top: 10px;
  border: 2px solid #5352ed;
  border-radius: 10px;
`;
const Img = styled.img`
  width: 170px;
  height: 80px;
  border-radius: 15px;
  margin: 20px 20px 0px 20px;
  margin-bottom: -30px;
  margin-left: -4px;
`;

const Text = styled(Box)`
text-align: center;
color: black;
font-size: 15px;
margin-left: -60px;
`
const SecondText = styled(Box)`
text-align: center;
color: black;
font-size: 10px;
margin-left: -60px;
`
function Bookmark() {
  const initial = useSelector(appReducers);
  const { bookmarks, folders, bookmarkFolder, bookmarkLoading } = initial;
  const imgUrl = image;
  return (
    <CustomBox>
      <AddLinkButton>+Add Link</AddLinkButton>
      <BookmarkBox>
        {bookmarkLoading === "initial" ? (
          <LoadingBox><BookIcon/>
          <Text>No Bookmarks Found</Text>
          <SecondText>Keep content organised <br/>with folders and subfolders</SecondText>
          </LoadingBox>
        ) : !bookmarkFolder.isEmpty && bookmarkLoading === "false" ? (
          folders[bookmarkFolder].bIds.map((item) => (
            <Card key={item}>
              <Img src={imgUrl} alt="title" />
              <Name>{bookmarks[item].name}</Name>
              <Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Description>
            </Card>
          ))
        ) : bookmarkLoading === "inProgress" ? (
          <LoadingBox>...Loading Bookmarks</LoadingBox>
        ) : (
          <LoadingBox></LoadingBox>
        )}
      </BookmarkBox>
    </CustomBox>
  );
}

export default Bookmark;
