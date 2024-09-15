// /components/ServiceCard.js
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ServiceCard = ({ request }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{request.description}</Typography>
        <Typography color="textSecondary">{request.location}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
