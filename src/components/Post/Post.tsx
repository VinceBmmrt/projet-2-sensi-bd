import * as React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { Post as TPost } from '../../@types/post';
import './Post.scss';
import { useAppSelector } from '../../hooks/redux';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type PostProps = {
  post: TPost;
  id: number;
  user_id: number;
  isLoading: boolean;
};
export default function Post({ post, isLoading, id, user_id }: PostProps) {
  const [expanded, setExpanded] = React.useState(false);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  console.log('🚀 ~ userId:', id);
  console.log('🚀 ~ postId:', user_id);
  // const isLoading = useAppSelector((state) => state.posts.isLoading);
  console.log('🚀 ~ isLoading:', isLoading);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    locale: fr,
    addSuffix: true,
  });
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.location.replace(`/messages/${id}/${user_id}`);
  };
  return (
    <div className="post">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            isLoading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                alt="User Avatar"
                src={post.avatar}
                sx={{ bgcolor: red[500] }}
              >
                {post.pseudonym.charAt(0).toUpperCase()}
              </Avatar>
            )
          }
          action={
            isLoading ? null : (
              <IconButton
                aria-label="Contacter"
                disabled={!isLogged}
                onClick={handleChangePage}
              >
                <ChatBubbleIcon />
              </IconButton>
            )
          }
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              post.pseudonym
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              formattedDate
            )
          }
        />

        {isLoading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="250"
            image={post.image}
            alt="photo de l'ouvrage"
          />
        )}
        {/* <div className="post__tag">Réservé</div> */}
        <CardHeader
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              post.post_title
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              '50km'
            )
          }
        />
        <CardActions disableSpacing>
          {isLoading ? (
            <>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </>
          ) : (
            <>
              <IconButton aria-label="add to favorites" disabled={!isLogged}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Signaler l'annonce" disabled={!isLogged}>
                <DangerousIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon sx={{ color: '#555' }} />
              </ExpandMore>
            </>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.book_title}</Typography>
            <Typography paragraph>{post.book_author}</Typography>
            <Typography>Description</Typography>
            <Typography>{post.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
