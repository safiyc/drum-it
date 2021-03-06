import React from 'react';
import GlobalStyle from './util/globalStyles';
import * as HF from './appStyling';
import * as S from './components/styling/drumMachineStyling';

import DrumPads from './components/DrumPads';
import imageDrum from './asset/drum-set.png';

import drumData from '../src/drumData';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '*'
    }

    this.pageBottomRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // arrow func not need bind(this)
    // this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  // #region functions
  componentDidMount() {
    // unable to scroll on load, unless set setTimeout
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 200);
    setTimeout(this.scrollToBottom, 600);

    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleClick(e) {

    const audio = document.querySelector(`[value="${e.target.value}"] audio`);
    console.log(audio);
    audio.currentTime = 0;
    audio.play();

    this.setState({
      display: e.target.id
    });

  }

  handleKeyPress(e) {
    const el = document.querySelector(`[value="${e.key.toUpperCase()}"]`);
    console.log(el);

    if (el === null) {
      return;
    } else {
      const audio = el.querySelector(`audio`);
      console.log(audio);
      audio.currentTime = 0;
      audio.play();

      el.classList.add('keyed');
      setTimeout(function () {
        el.classList.remove('keyed');
      }, 150);

      this.setState({
        display: el.getAttribute('id')
      });
    }
  }

  scrollToBottom = () => {
    this.pageBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  // #endregion functions

  render() {
    return (
      <div>
        <GlobalStyle />
        <HF.Curtain><p>&#9650;</p></HF.Curtain>
        <HF.Heading>
          <HF.ProjectName>Drum It!</HF.ProjectName>
          <HF.Subheading>click it ~ keypress it</HF.Subheading>
        </HF.Heading>
        <S.ContentSection id='drum-machine'>
          <S.ContentOverlay />
          <S.CrowdImg />
          <S.CrowdOverlay />
          <S.SoundDisplay id='display'><p>{this.state.display}</p></S.SoundDisplay>
          <S.StageAreaContainer>
            <S.StageOverlay />
            <S.Stage />
            <S.DrumsetContainer>
              <S.DrumImg src={imageDrum} alt='drumset' />
              {drumData.map((data, index) => {
                return (
                  <DrumPads
                    key={index}
                    value={data.value}
                    id={data.id}
                    onClick={this.handleClick}
                    nestedAudioSrc={data.nestedAudio.src}
                    nestedAudioId={data.value} />
                )
              })}
            </S.DrumsetContainer>
          </S.StageAreaContainer>
        </S.ContentSection>
        <HF.Footer>
          <HF.FooterLink href="http://www.safiycham.com/">
            Drum It!&nbsp;&ndash;&nbsp;safiy cham &nbsp;&#169;&nbsp;2019
          </HF.FooterLink>
        </HF.Footer>
        <div ref={this.pageBottomRef} />
      </div>
    );
  }
}