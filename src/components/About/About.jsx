import s from "./About.module.css";

const About = (props) => {
    const articles = props.articles.map((item, i) => <a key={i + 1} href={item.href} className={s.button} target="_blank">{item.text}</a>);

    return(
        <div className={s.wrapper}>
            <h1 className={s.title}>Click on any of the title below to be redirected to our Medium articles</h1>
            <div className={s.list}>{articles}</div>
        </div>
    ) 
}

export default About;