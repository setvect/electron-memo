# Election_Vue.js - 메모장
Election과 Vue.js를 이용해 간단한 메모장 어플리케이션이다.

## 계획
* 01 Step: Electron + Vue.js + Typescript 초기 셋팅
* 02 Step: 디버깅 환경 셋팅 - Main Process, Renderer Process VUEJS_DEVTOOLS
* 03 Step: 개발환경 셋팅 - VSCode에 ESLint, Prettier 연동
    - VSCode Extension 설치 - ESLint, Prettier - Code formatter
* 04 Step: 메모장 컴포넌트(HTML) 만들기

## 인스톨 및 실싱
### 최초 실행
```
npm i
```

### 개발 모드 실행
```
npm start
```

### 인스톨 버전 만들기
```
npm run electron:build
```
* `./dist_electron` 디렉토리에 인스톨 파일 빌드됨

## 참고 사이트
* 프로젝트 초기화: https://itnext.io/electron-application-with-vue-js-and-vuetify-f2a1f9c749b8
* Electron 디버깅: https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/80
* BootstrapVue: https://bootstrap-vue.org/
