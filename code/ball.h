#pragma once
#include<string>
#include<iostream>
#include<vector>
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include"shader.h"
#include "camera.h"
#include"Model.h"
const float ballY = 1.3f;
const float speedBegin = 15.0f;
class Ball
{
public:
	Ball();
	~Ball();
	void init(std::string const &path);
	void update();
	void rotateAndMove();
	void draw(shader shader);
	void again();
	inline void crossMove(float begin,float end);
	 void setRightOrLeft(int a);
	 void setJump(bool a);
	 float getZ();
	 void jumpMove(float y);
	 glm::vec3 cPos;
	 float xConstant;
private:
	Model ballModel;
	glm::mat4 currentPos;
	glm::mat4 nextPos;
	int rightOrLeft;
	bool jump;
	float zSpeed;//zSpeed ��ǰ�����ٶ�
	float xSpeed;//xSpeed �������ƶ����ٶ�
	float angleSpeed;
	float g;//�������ٶ�
	glm::vec3 nPos;
	
};

