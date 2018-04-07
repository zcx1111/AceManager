<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html lang="en">
<head>
<meta charset="utf-8">
<link href='http://fonts.googleapis.com/css?family=Creepster|Audiowide' rel='stylesheet' type='text/css'>
<style>
* {
	margin: 0;
	padding: 0;
}

body {
	font-family: arial, helvetica, sans-serif;
	background:
		url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAUElEQVQYV2NkYGAwBuKzQAwDID4IoIgxIikAMZE1oRiArBDdZBSNMIXoJiFbDZYDKcSmCOYimDuNSVKIzRNYrUYOFuQgweoZbIoxgoeoAAcAEckW11HVTfcAAAAASUVORK5CYII=)
		repeat;
	background-color: #212121;
	color: white;
	font-size: 28px;
	padding-bottom: 20px;
}

.error-code {
	font-family: 'Creepster', cursive, arial, helvetica, sans-serif;
	font-size: 200px;
	color: white;
	color: rgba(255, 255, 255, 0.98);
	width: 50%;
	text-align: right;
	margin-top: 5%;
	text-shadow: 5px 5px hsl(0, 0%, 25%);
	float: left;
}

.not-found {
	font-family: 'Audiowide', cursive, arial, helvetica, sans-serif;
	width: 45%;
	float: right;
	margin-top: 5%;
	font-size: 50px;
	color: white;
	text-shadow: 2px 2px 5px hsl(0, 0%, 61%);
	padding-top: 70px;
}

.clear {
	float: none;
	clear: both;
}

.content {
	text-align: center;
	line-height: 30px;
}

input[type=text] {
	border: hsl(247, 89%, 72%) solid 1px;
	outline: none;
	padding: 5px 3px;
	font-size: 16px;
	border-radius: 8px;
}

a {
	text-decoration: none;
	color: #9ECDFF;
	text-shadow: 0px 0px 2px white;
}

a:hover {
	color: white;
}
</style>
<title>Error</title>
</head>
<body>
	<p class="error-code">401</p>
	<p class="not-found">
		No<br />Authority
	</p>
	<div class="clear"></div>
	<div class="content">
		您 没 有 权 限 访 问 此 页 面  <br> <br>
		<a href="${pageContext.request.contextPath}/index.html">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<a href="#"onclick="javascript:history.back();">Back</a>
		<br> <br>
		
	</div>
</body>
</html>
