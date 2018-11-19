for i in `nodejs seasonedschemer.js $1 | grep link | awk '{ print $2 }' | sed "s/'//g"`
do
	python hehe.py $i
done
