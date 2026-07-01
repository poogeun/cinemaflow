# CinemaFlow

> 영화 상영 정보부터 좌석 선택, 예매 관리까지 연결하는 풀스택 영화 예매 플랫폼

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Admin_Web-61DAFB?style=flat-square&logo=react&logoColor=111111)
![Expo](https://img.shields.io/badge/Expo-Customer_App-000020?style=flat-square&logo=expo&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white)

CinemaFlow는 고객용 모바일 앱, 관리자용 웹 콘솔, Express API 서버로 구성된 영화 예매 서비스입니다.  
고객은 영화 목록과 상영 시간을 확인하고 좌석을 선택해 예매할 수 있으며, 관리자는 영화, 상영관, 상영 일정, 예매 현황을 운영할 수 있습니다.

## 미리보기

| 고객 앱 | 관리자 웹 |
| --- | --- |
| 영화 탐색, 상영 시간 선택, 좌석 예매, 내 예매 확인 | 대시보드, 영화 관리, 상영관 관리, 상영 일정 자동 생성, 예매 관리 |
| `Expo Router` 기반 모바일 화면 | `React + Vite + MUI` 기반 관리자 콘솔 |

## 주요 기능

### 고객

- 회원가입 및 로그인
- 영화 목록 조회
- 영화 상세 정보 확인
- 영화별 상영 시간 선택
- 좌석 선택 후 예매
- 내 예매 내역 확인 및 취소

### 관리자

- 관리자 로그인
- 영화 CRUD 및 TMDB 영화 동기화
- 상영관 등록 및 좌석 구성 관리
- 상영 일정 생성, 수정, 삭제
- 자동 상영 스케줄 미리보기 및 확정
- 전체 예매 현황 조회

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| 고객 앱 | Expo, React Native, Expo Router, Axios |
| 관리자 웹 | React, Vite, MUI, React Router |
| 백엔드 | Node.js, Express, Prisma, JWT |
| 데이터베이스 | PostgreSQL 17, Docker Compose |
