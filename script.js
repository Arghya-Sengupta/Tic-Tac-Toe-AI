var board = ['-','-','-','-','-','-','-','-','-'];
const H = 'X';
const AI = 'O';

var isGameOn = true;
const cells = document.querySelectorAll('.cell');

function startGame()
{
	isGameOn = true;
	document.querySelector(".result").style.display = "none";
	board = ['-','-','-','-','-','-','-','-','-'];
	
	for(var i=0;i<9;i++)
	{
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',turnClick,false);
	}
}

function turnClick(square)
{
	if(isGameOn && board[square.target.id]=='-')
	{
		turn(square.target.id, H);
		if(! isTie(board) && isGameOn)
			turn(bestMove(board),AI);
	}
}

var winCombos = [-1,-1,-1];

function turn(sqid, player)
{
	board[sqid] = player;
	document.getElementById(sqid).innerText = player;
	if(checkWin(board,player))
		gameOver(false,player);
	else if(isTie(board))
		gameOver(true,player);
}

function checkWin(board,player)
{
	var flag = false;
	flag = flag || checkCombo(0,1,2,player);
	flag = flag || checkCombo(3,4,5,player);
	flag = flag || checkCombo(6,7,8,player);
	flag = flag || checkCombo(0,3,6,player);
	flag = flag || checkCombo(1,4,7,player);
	flag = flag || checkCombo(2,5,8,player);
	flag = flag || checkCombo(0,4,8,player);
	flag = flag || checkCombo(2,4,6,player);
	return flag;
}

function checkCombo(i,j,k,player)
{
	if(board[i]==player && board[j]==player && board[k]==player)
	{
		winCombos[0] = i;
		winCombos[1] = j;
		winCombos[2] = k;		
		return true;
	}
	return false;
}

function isTie(board)
{
	var flag = true;
	for(var i=0;i<9;i++)
	{
		if(board[i]=='-')
		{
			flag = false;
		}
	}
	return flag;
}

function gameOver(tie,player)
{
	var result;
	var color;
	if(tie)
	{
		result = "Tie";
		color = "#00ff00";
		for(var i=0;i<9;i++)
			document.getElementById(i).style.backgroundColor = color;
	}
	else
	{
		if(player === 'X')
		{
			result = "You Win";
			color = "#0066ff";
		}
		if(player === 'O')
		{
			result = "You Lose";
			color = "#ff0000";
		}
		document.getElementById(winCombos[0]).style.backgroundColor = color;
		document.getElementById(winCombos[1]).style.backgroundColor = color;
		document.getElementById(winCombos[2]).style.backgroundColor = color;
	}
	document.querySelector(".result").innerText = result;	
	document.querySelector(".result").style.display = "block";
	isGameOn = false;
}

function bestMove(board)
{
	var maxScore = -Infinity;
	var ans = 0;
	
	for(var i=0;i<9;i++)
	{
		if(board[i]=='-')
		{
			board[i] = 'O';
			if(checkWin(board, AI))
				return i;
			var score = minimax(board,false);
			board[i] = '-';
			if(score>maxScore)
			{
				maxScore = score;
				ans = i;
			}
		}
	}
	return ans;
}

function minimax(newBoard, isMaximizing) 
{
    if (checkWin(newBoard, H))
        return -10;
    if (checkWin(newBoard, AI))
        return 10;
    if (isTie(newBoard))
        return 0;

    if (isMaximizing) 
	{
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) 
		{
            if (newBoard[i] == '-') 
			{
                newBoard[i] = AI;
                let score = minimax(newBoard, false);
                newBoard[i] = '-';
                if (score > bestScore)
                    bestScore = score;
            }
        }
        return bestScore;
    }
	else 
	{
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) 
		{
            if (newBoard[i] == '-') 
			{
                newBoard[i] = H;
                let score = minimax(newBoard, true);
                newBoard[i] = '-';
                if (score < bestScore)
                    bestScore = score;
            }
        }
        return bestScore;
    }
}
