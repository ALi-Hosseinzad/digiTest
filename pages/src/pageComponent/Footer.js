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

  const socials = [
    { id: 0, src: "Youtube", hoverColor: "#FF0000" },
    { id: 1, src: "Twitter", hoverColor: "#00acee " },
    { id: 2, src: "Instagram", hoverColor: "#8a3ab9" },
    { id: 3, src: "Facebook", hoverColor: "#3b5998" },
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
            {/* {socials.map((item) => (
              <IconButton
                key={item.id}
                component="a"
                href="/"
                className={classes.iconButton}
              >
                <CustomIcon src={`/${item.src}.svg`} size={30} />
              </IconButton>
            ))} */}
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
