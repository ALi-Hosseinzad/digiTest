import { Container, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { IconButton } from "@mui/material/IconButton";
import classes from "../../../styles/Footer.module.css";
import CustomIcon from "../components/Icon";

const Footer = () => {
  const linkTitle = [
    { id: 0, href: "/", title: "Home" },
    { id: 1, href: "/todo", title: "Todo" },
  ];

  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          className={classes.links}
        >
          <div className={classes.rightSection}>
            {linkTitle.map((item) => (
              <Link key={item.id} href={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className={classes.leftSection}>
            
          </div>
        </Grid>
        <Grid item {...{ xs: 12 }} className={classes.copyRight}>
          <Typography>copy right©2022</Typography>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;
