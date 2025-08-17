# Auto-generated script for Anolis OS
# Generated from: anolis.md
# Mirror ID: anolis-os

check() {
	source_os_release
	[ "$NAME" = "Anoolis" ]
}

_anolis-os_install_1() {
	# 一键替换Alpine Linux软件源
	set_sudo

	if [ -f /etc/yum.repos.d/*.repo ]; then
		$sudo mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/anolis-os_first__etc_yum.repos.d__.repo.bak ] || $sudo cp /etc/yum.repos.d/*.repo ${_backup_dir}/anolis-os_first__etc_yum.repos.d__.repo.bak || {
			print_error "Backup /etc/yum.repos.d/*.repo failed"
			return 1
		}
		$sudo sed -i -E -e "s|https?://(mirrors\\.openanolis\\.cn)|$http://$domain|g" /etc/yum.repos.d/*.repo || {
			print_error "Failed to update /etc/yum.repos.d/*.repo"
			return 1
		}
	else
		print_warning "File /etc/yum.repos.d/*.repo does not exist"
	fi

	return 0
}

_anolis-os_install_2() {
	# 更新软件包索引
	set_sudo

	# Execute commands
	$sudo yum makecache
	$sudo yum update

	return 0
}

install() {

	_anolis-os_install_1 || return 1
	_anolis-os_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/anolis-os_first__etc_yum.repos.d__.repo.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/anolis-os_first__etc_yum.repos.d__.repo.bak" /etc/yum.repos.d/*.repo 2>/dev/null || true
		print_info "Restored /etc/yum.repos.d/*.repo"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/anolis-os_1_1.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/yum.repos.d/*.repo ] && grep -q "$domain" /etc/yum.repos.d/*.repo 2>/dev/null && return 0
	return 1
}
