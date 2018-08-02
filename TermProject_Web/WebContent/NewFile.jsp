<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.io.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		// 사진 파일 관련 정보다 txt 파일로 저장  DB없어 임시로 사용 //
		String[] urls = request.getParameterValues("url");
		
		if (urls.length != 0) {
			String fileName = "url.txt"; //생성할 파일명
			String filePath = request.getSession().getServletContext().getRealPath("/uploadURLs/");
			File fPath = new File(filePath); //경로생성

			if (!fPath.exists()) {
				fPath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}

			filePath += fileName; //생성할 파일명을 전체경로에 결합

			try {
				File f = new File(filePath); // 파일객체생성
				f.createNewFile(); //파일생성

				// 파일쓰기
				FileWriter fw = new FileWriter(filePath, true); //파일쓰기객체생성
				
				for(int i=0; i<urls.length; i++){
					fw.write(urls[i]); //파일에다 작성
					fw.write("+");
				}
				
				fw.close(); //파일핸들 닫기

			} catch (IOException e) {
				System.out.print(e.toString());
			}
		} else {
			System.out.print("저장되지않았습니다.");
		}
	%>
</body>
</html>